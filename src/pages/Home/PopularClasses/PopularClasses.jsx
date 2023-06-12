import { useTheme } from '@emotion/react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Bounce, Fade } from 'react-awesome-reveal';
import useAuth from '../../../components/hooks/useAuth';
import Swal from 'sweetalert2';

const PopularClasses = () => {
    const { user } = useAuth()

    const theme = useTheme();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
          const res = await axios(`http://localhost:5000/popularClasses`)
          return res.data;
        }
      })
      console.log(classes)
      const handleSelectClass =(item)=>{
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
      axios.post('http://localhost:5000/selectClass', selectClass)
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
      }})
      }
    return (<>
        <Fade>
           <div className=" my-3 py-2 w-1/2 mx-auto rounded-full" data-theme="retro">
                <h2 className="text-3xl md:text-5xl font-extrabold text-neutral font-serif text-center my-2">Our Top <span className='text-warning'>Classes</span></h2>
            </div>
           </Fade>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto ">
        {classes.map((item, i)=>
            <div  data-theme="pastel"  key={i}>
             <Bounce>
                   
            <Card  className='hover:bg-primary hover:bg-opacity-20 ' sx={{ display: 'flex' ,}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography className='' component="div" variant="h5">
           <span className='text-sm font-semibold font-mono'>{item?.name}</span>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
          <span className='text-sm font-semibold font-mono'>price: {item?.price}</span>
          <br />
          <span className='text-sm font-semibold font-mono'>Total Enrolled: {item?.TotalEnrolled}</span>
          <br />
          <span className='text-sm font-semibold font-mono'>Available Seats: {item?.seats}</span>
          </Typography>
        </CardContent>
        <CardActions>
                    <Button disabled={item?.seats ===0 }  onClick={() => handleSelectClass(item)} className='animate__animated animate__jello ' color="secondary" size="medium">Enroll now !</Button>

                  </CardActions>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image={item.image}
        alt="Live from space album cover"
      />
    </Card>
             </Bounce>
        </div>
       ) }
        </div>
        </>
    );
};

export default PopularClasses;