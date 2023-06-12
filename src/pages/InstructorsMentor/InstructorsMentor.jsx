import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Collapse } from 'react-collapse';
import { FcExpand, FcNext } from "react-icons/fc";
import useAuth from '../../components/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';

const InstructorsMentor = () => {
  const [classesInfo, setClassesInfo] = useState([]);
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState([]);
  const [isCollapseLoading, setIsCollapseLoading] = useState([]);

  const InstructorDetails = async (email) => {
    setIsCollapseLoading(true);
    const res = await axios.get(`https://tasnia-yoga-and-meditation-school-server.vercel.app/classes/${email}`);
    console.log(res.data);
    setClassesInfo(res.data);
    setIsCollapseLoading(false);
  };

  const { user, loading } = useAuth();

  const { data: instructorsMentor = [], refetch } = useQuery({
    queryKey: ['instructors', user?.email],
    queryFn: async () => {
      const res = await axios.get(`https://tasnia-yoga-and-meditation-school-server.vercel.app/instructorsMentor`)
      return res.data;
    }
  });

  const toggleCollapse = useCallback(
    (index) => {
      setIsButtonCollapseOpen((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    },
    []
  );

  return (
    <div>
      <Helmet>
        <title>Tasnia YMS | Instructors</title>
      </Helmet>
      
        
     
      <PageTitle title={"Our Instructors"}></PageTitle>
      <Zoom><h2 className='text-center text-2xl font-bold my-3'>Decade of Teaching <span className='text-warning'>Experience</span></h2></Zoom>

      <div  className="grid  grid-cols-1 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
        {instructorsMentor.map((instructor, index) => (
          <Card key={instructor._id} className=''>
            <CardActionArea>
            <Fade cascade damping={0.1}>
              <CardMedia
              className='h-60'
                component="img"
                height="140"
                image={instructor.photo}
                alt="instructor"
              />
             
              <CardContent className='space-x-1'>
                <Typography gutterBottom variant="h5" component="div" className='my-0'>
                  {instructor.name}
                </Typography>
                <Typography gutterBottom variant="p" className='text-xs my-0' component="div">
                  Email: {instructor.email}
                </Typography>
                <Typography gutterBottom variant="p" className='text-xs my-0' component="div">
                  <div className="config">
                    <button
                      aria-controls={index}
                      aria-expanded={isButtonCollapseOpen[index]}
                      onClick={() => {
                        toggleCollapse(index);
                        InstructorDetails(instructor.email);
                      }}
                      type="button"
                      className='btn btn-link btn-info flex items-center px-0'>
                      Classes <FcExpand></FcExpand>
                    </button>
                  </div>
                </Typography>
                <Typography className='overflow-auto' variant="body2" color="text.secondary">
                  <Collapse isOpened={isButtonCollapseOpen[index]}>
                    <div id={index} className="blob">
                      {/* collapse content */}
                      {isCollapseLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          {classesInfo.instructorEmail === instructor.email && (
                            <>
                              <span className='text-semibold'>Total class:</span> {classesInfo.count}
                              <br />
                              {classesInfo.count > 0 && <span className='font-semibold'>classes:</span>}
                              {classesInfo.className.map((name, i) => (
                                <p key={i}>{name}</p>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </Collapse>
                </Typography>
              </CardContent>
              </Fade>
            </CardActionArea>
          </Card>
        ))}
      </div>
    
    </div>
  );
};

export default InstructorsMentor;
