import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const Classes = () => {

    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Classes</title>
            </Helmet> 
            <PageTitle title={"Classes"}></PageTitle>
            <div className="">
            
            <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{ pt: '56.25%', }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
            
            </div>
        </div>
    );
};

export default Classes;