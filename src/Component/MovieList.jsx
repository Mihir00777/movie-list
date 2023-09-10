import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieList, searchMovieList } from "../action";
import {
  Box,
  Pagination,
  Stack,
  Button,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Grid,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import moment from "moment";
import { Rings } from "react-loader-spinner";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
const BoxWrapper = styled(Box)(() => ({
  ".search-box": {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  ".css-wffmiv .css-1t6e9jv-MuiCardActions-root": {
    justifyContent: " !important",
  },
  ".movie-title": {
    fontSize: "18px",
    fontWeight: 700,
    fontFamily: "Source Sans Pro, Arial, sans-serif",
  },
}));
const CardActionsBox = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "center",
}));
const MovieList = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state?.movies?.movieList);
  const searchList = useSelector((state) => state?.movies?.searchMovieList);
  const loading = useSelector((state) => state.movies?.loading);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = searchList?.results?.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMovieList(page, searchQuery));
    } else {
      dispatch(movieList(page));
    }
  }, [dispatch, page, searchQuery]);
  // For WishList
  const [watchlist, setWatchlist] = useState([]);

  const addToWatchlist = (movie) => {
    const movieExists = watchlist.some((item) => item.id === movie.id);
    if (!movieExists) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };
  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };
  const clearWatchlist = () => {
    setWatchlist([]);
    localStorage.removeItem("watchlist");
  };
  useEffect(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, [page, searchQuery]);

  console.log("watchlist---", watchlist);
  return (
    <BoxWrapper p={"5%"}>
      <h1>Movie List</h1>
      <Box>
        <TextField
          label="Search here"
          value={searchQuery}
          className="search-box"
          size="small"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <>
          <Rings
            type="Rings"
            color="#00BFFF"
            height={80}
            width={80}
            // timeout={10000}
          />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {filteredData?.length > 0 ? (
              filteredData?.map((data, ind) => {
                return (
                  <Grid item xl={2} lg={3} md={4} xs={12} sm={6} key={ind}>
                    <Card>
                      <CardActionArea
                        onClick={() => navigate(`/movie-details/${data?.id}`)}
                      >
                        <CardMedia
                          component="img"
                          height="280"
                          image={`https://www.themoviedb.org/t/p/w220_and_h330_face${data?.poster_path}`}
                          alt="green iguana"
                        />
                        <CardContent sx={{ minHeight: "80px" }}>
                          <Typography className="movie-title">
                            {data?.title}
                          </Typography>
                          <Typography component="div">
                            {moment(data?.release_date).format("DD MMM YYYY")}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActionsBox>
                        <Button
                          variant="contained"
                          onClick={() =>
                            addToWatchlist({ id: data?.id, title: data?.title })
                          }
                          disabled={watchlist.some(
                            (item) => item.id === data?.id
                          )}
                        >
                          Add Wishlist
                        </Button>
                      </CardActionsBox>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <>
                {list?.results?.map((data, ind) => {
                  return (
                    <Grid item xl={2} lg={3} md={4} xs={12} sm={6} key={ind}>
                      <Card>
                        <CardActionArea
                          onClick={() => navigate(`/movie-details/${data?.id}`)}
                        >
                          <CardMedia
                            component="img"
                            height="280"
                            image={`https://www.themoviedb.org/t/p/w220_and_h330_face${data?.poster_path}`}
                            alt="green iguana"
                          />
                          <CardContent sx={{ minHeight: "80px" }}>
                            <Typography className="movie-title">
                              {data?.title}
                            </Typography>
                            <Typography component="div">
                              {moment(data?.release_date).format("DD MMM YYYY")}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActionsBox>
                          <Button
                            variant="contained"
                            onClick={() =>
                              addToWatchlist({
                                id: data?.id,
                                title: data?.title,
                              })
                            }
                            disabled={watchlist.some(
                              (item) => item.id === data?.id
                            )}
                          >
                            Add Wishlist
                          </Button>
                        </CardActionsBox>
                      </Card>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
          <Box mt={2} display={"flex"} justifyContent={"end"}>
            <Stack spacing={2}>
              <Pagination
                count={
                  searchQuery ? searchList?.total_pages : list?.total_pages
                }
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={(e) => {
                  setPage(parseInt(e.target.innerText));
                }}
              />
            </Stack>
          </Box>
        </>
      )}
    </BoxWrapper>
  );
};

export default MovieList;
