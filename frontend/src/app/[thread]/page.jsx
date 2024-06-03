'use client'
import React, { useEffect, useState } from 'react';
import CustomSection from '@/components/custom-section/CustomSection';
import ThreadGlobal from '@/components/threads/ThreadGlobal';
import Comment from '@/components/threads/Comment';
import Reply from '@/components/threads/Reply';
import { useDispatch, useSelector } from 'react-redux'
import { changeIsInThread, changeIsNotInThread, selectThreadId } from '@/lib/slices/threadSlice/threadSlice'
import {selectComments, selectLatestComment} from '@/lib/slices/commentSlice/commentSlice'

const ThreadPage = () => {
  const threadId = useSelector(selectThreadId); // Get thread ID from Redux store
  const [thread, setThread] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([])
  const [commentReply, setCommentReply] = useState([])
  const newComment = useSelector(selectLatestComment)
  const allComments = useSelector(selectComments)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/thread/show/${threadId}`, {
          method: 'GET'
        });

        if (!response.ok) {
          setError(response.statusText);
        } else {
          const data = await response.json();
          setThread(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching threads");
      } finally {
        setIsLoading(false);

      }
    };

    if (threadId) {
      // Fetch data only if threadId exists
      fetchData();
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('threadId', threadId);
  }, [threadId, dispatch]);


  useEffect(() => {
    dispatch(changeIsInThread());
  }, [])


  useEffect(() => {
    fetch(`http://localhost:8080/comment/${threadId}/all`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : ''
      }
    }).then(response => response.json())
      .then(data => {
        setComments(data)

        console.log('Дані успішно завантажені: ', data)
      }).catch(error => {
      console.error('Error fetching data:', error)
    })

  } , [allComments.length, newComment])




  return (
    <CustomSection direction="col" center="items-start">
      <div className="grid grid-cols-1 gap-y-1.5">
        {error && <p>{error}</p>}
        {thread && (
          <ThreadGlobal
            text={thread.text}
            title={thread.title}
            id={thread.id}
            date={thread.date}
            username={thread.author.username}
            imageData={thread.imageData}
            role = {thread.author.role.name}
          />
        )}
        {comments.length > 0 && comments.map((element, index) => (
        <Comment
          username={element.author?.username}
          date={element.date}
          text={element.text}
          imageData={element.imageData}
          key={index}
          id = {element.id}
          role={element.author.role.name}
        />

))}



      </div>
    </CustomSection>
  );
};

export default ThreadPage;
