import React, { useState } from 'react'
import "./Feed.scss"
import Share from '../share/Share'
import Post from '../post/Post'
import { Link, useParams } from 'react-router-dom'
import { getAuthUser } from '../../localStorage/storage'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Feed = (data) => {
  const user = getAuthUser()

  let { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [community, setCommunity] = React.useState('');

  const handleChange = (event) => {
    setCommunity(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const [post, setPost] = useState({
    loading: true,
    err: null,
    reviewDesc: "",
    rating: "",
    clientId: user._id,
    serviceId: id,
    reload: 0
  });

  const addPostData = async (e) => {
    e.preventDefault();

    setPost({ ...post, loading: true, err: null });

    axios
      .post("http://localhost:3000/api/reviews/addReview", {
        // reviewDesc: addReview.reviewDesc,
        // rating: addReview.rating,
        // clientId: addReview.clientId,
        // serviceId: addReview.serviceId,
      })
      .then((resp) => {
        // setPost({ reload: reviews.reload + 1 });
        console.log(resp);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  return (
    <div className='feed'>
      <div className="feedContainer">
        <form className='postFormContainer' onSubmit={addPostData} >
          <div className='share'>
            <div className="shareContainer">
              <div className="shareTop">
                <Link reloadDocument to={"/communityProfile/" + data?.data._id} >
                  <img className='shareProfileImg' src={data?.data.image_url} />
                </Link>
                <input
                  placeholder="What's on your mind, Mana?"
                  className='shareInput'
                  required
                />
              </div>
              <hr className='shareHr' />
              <div className="shareBottom">
                <div className="shareOptions">
                  <div className="shareOption">
                    <img className='shareIcon' src="/img/photo.png" alt="" />
                    <span className='shareOptionText'>Photo/video</span>
                  </div>
                  <div className="shareOption">
                    <img className='shareIcon' src="/img/groups.png" />
                    <div>
                      <Button sx={{color : "rgb(107, 107, 107)"}} onClick={handleClickOpen}>Communities</Button>
                      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                        <DialogTitle>Please Choose A Coummunity</DialogTitle>
                        <DialogContent>
                          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 250 }}>
                              <InputLabel id="demo-dialog-select-label">Community</InputLabel>
                              <Select
                                required
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={community}
                                onChange={handleChange}
                                input={<OutlinedInput label="Age" />}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
                                <MenuItem value="Video & Animation">Video & Animation</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Ok</Button>
                        </DialogActions>
                      </Dialog>
                    </div>                  </div>
                </div>
                <button type='submit' className='shareButton'>Post</button>
              </div>
            </div>
          </div>
        </form>
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Feed