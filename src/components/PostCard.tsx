import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import sealLike from '../assets/icons/seal-like.png';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    image: string;
    likes: number;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {

  const numFormatter = (num: number) => {
    if(num > 999 && num < 1000000) return (num/1000).toFixed(1) + 'K';
    else if(num >= 1000000) return (num/1000000).toFixed(1) + 'M';
    else return num.toString();
  };

  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', cursor: 'pointer', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={post.image}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {post.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={sealLike} alt="Like" style={{ width: 20, marginRight: 4 }} />
          <Typography>{numFormatter(post.likes)}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
