import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fade, JackInTheBox, Slide } from 'react-awesome-reveal';
import useAuth from '../../components/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../components/hooks/useAxiosSecure';

const Classes = () => {

  const { user } = useAuth()
  const [axiosSecure] =useAxiosSecure()
  const location = useLocation();



  const { data: classes = [], refetch } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await axios(`https://tasnia-yoga-and-meditation-school-server.vercel.app/approveClasses`)
      return res.data;
    }
  })
  console.log(classes)

  const handleSelectClass = (item) => {
    console.log(user)
    if (user === null) {
      Swal.fire({
        icon: 'error',
        title: 'User not found',
        text: 'Please Login!',
        footer: '<a href="/login">Login Now</a>'
   
      })
    }
    
      const selectClass = {
        classID: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        email: user.email,
        instructorName : item.InstructorName 
      }
      console.log(selectClass)
      axios.post('https://tasnia-yoga-and-meditation-school-server.vercel.app/selectClass', selectClass)
      .then(res=>{
        if(res.data.insertedId){
          refetch()
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'select class',
          showConfirmButton: false,
          timer: 1500
      })
        } else{
          Swal.fire({
            icon: 'error',
            title: 'Class already selected',
            // text: 'Please Login!',
          
          })
        }
      })
      
        
      
    }

    return (
      <div>
        <Helmet>
          <title>Tasnia YMS | Classes</title>
        </Helmet>

        <PageTitle title={"Classes"}></PageTitle>
        <JackInTheBox> <h2 className='text-center text-2xl font-bold my-3'>Our <span className='text-warning'>Classes</span></h2></JackInTheBox>
        <div className=" grid lg:grid-cols-4 grid-cols-1 gap-5 w-11/12 mx-auto" >

          {
            classes.map((item, i) =>

              <Fade cascade key={item._id}>
                <Card className={`${
    item.seats === 0 ? '' : 'hover:bg-green-400 hover:bg-opacity-10'
  }`} key={item._id}
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: item.seats === 0 ? 'red' : 'initial'
  }}
                >
                  <CardMedia
                    component="div"
                    sx={{ pt: '56.25%', }}
                    image={item.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <span>{item.name}</span>
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      <span>Instructor Name: {item.InstructorName}</span>
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      <span>Available Seats: {item.seats}</span>
                    </Typography>
                    <Typography gutterBottom variant="p" component="p">
                      <span>Price: {item.price}</span>
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button disabled={item.seats === 0}  onClick={() => handleSelectClass(item)} className='animate__animated animate__jello' size="medium">Select Class</Button>

                  </CardActions>
                </Card>
              </Fade>

            )
          }

        </div>
      </div>
    );
  };

  export default Classes;