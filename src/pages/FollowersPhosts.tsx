import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import type { RootState } from '../utilities/store/store';
import DraftBox from './DraftBox';
import { Header } from '../components/Header';
import { getFollowingPhosts } from '../api/user.api';
import PublishedPosts from './PublishedPosts';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export interface draft {
  _id: string;
  title: string;
  createdAt: string;
  image?: string | null;
  username: string;
  likeCount: number;
  commentCount: number;
}

const FollowerPhosts: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const name = useSelector((state: RootState) => state.persistedReducer.name)

  const [draftData, setdraftData] = useState<draft[]>([]);

  useEffect(() => {
    if (!name) return;

    const getPhosts = async () => {
      try {
        const response = await getFollowingPhosts(axiosPrivate, name);

        if (response.data) {
          setdraftData(response.data);
        }
      } catch (error) {

      }
    };

    getPhosts();

  }, [name]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header action={undefined} />

      <Typography sx={{ mt: 7, ml: 5 }} variant="h4" gutterBottom>
        Followers Daily Updates
      </Typography>
      <Divider />
      {draftData.map((draft) => (
        <PublishedPosts
          key={draft._id}
          draftId={draft._id}
          title={draft.title}
          createdAt={draft.createdAt}
          image={draft.image}
          name={draft.username}
          status={""}
          like={draft.likeCount}
          comment={draft.commentCount}
        />
      ))}
    </Box>
  );
}

export default FollowerPhosts;