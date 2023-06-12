import { Card, CardActionArea, CardContent, CardMedia,  Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';
import { Fade } from 'react-awesome-reveal';

const PopularInstructorsSection = () => {
    const { data: instructorsMentor = [], refetch } = useQuery({
        queryKey: ['instructors', ],
        queryFn: async () => {
          const res = await axios.get(`https://tasnia-yoga-and-meditation-school-server.vercel.app/instructorsMentor`)
          return res.data;
        }
      });
      console.log(instructorsMentor)
    return (
        <div>
            <TitleStyle first={"Our Honorable"} second={"Teacher"}></TitleStyle>
          <div  className="grid  grid-cols-1 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
        {instructorsMentor.slice(0,6).map((instructor, index) => (
          <Fade key={instructor._id}>
            <Card  key={instructor._id} className=''>
            <CardActionArea>
         
              <CardMedia
              className='h-60'
                component="img"
                height="140"
                image={instructor.photo}
                alt="instructor"
              />
             
              <CardContent data-theme="autumn" className='space-x-1'>
                <Typography gutterBottom variant="h5" component="div" className='my-0'>
                 <span className='text-xl font-sans font-bold'> {instructor.name}</span>
                </Typography>
                <Typography gutterBottom variant="p" className='text-xs my-0' component="div">
                  <span className='text-sm m-0 p-0'>Email: {instructor.email}</span>
                </Typography>
                
                <Typography
                 className='overflow-auto' variant="body2" color="text.secondary">
                  
                </Typography>
              </CardContent>
        
            </CardActionArea>
          </Card>
          </Fade>
        ))}
      </div>  
        </div>
    );
};

export default PopularInstructorsSection;