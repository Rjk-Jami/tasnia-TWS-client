import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fade, JackInTheBox, Slide } from 'react-awesome-reveal';

const Classes = () => {
  const {data: classes = [], refetch} = useQuery({
    queryKey: ['classes' ],
    queryFn: async()=>{
        const res = await axios(`http://localhost:5000/approveClasses`)
        return res.data;
    }
})
console.log(classes)


    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Classes</title>
            </Helmet> 
           
            <PageTitle title={"Classes"}></PageTitle>
           <JackInTheBox> <h2 className='text-center text-2xl font-bold my-3'>Our <span className='text-warning'>Classes</span></h2></JackInTheBox>
            <div className=" grid lg:grid-cols-4 grid-cols-1 gap-5 w-11/12 mx-auto" >
           
            {
              classes.map((item, i)=>
              
               <Fade cascade key={item._id}>
                 <Card className='hover:bg-green-400 hover:bg-opacity-10' key={item._id}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{ pt: '56.25%', }}
                    image={item.image}
                  />
                  <CardContent  sx={{ flexGrow: 1 }}>
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
                    <Button className='animate__animated animate__jello' size="medium">Select Class</Button>
                    
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