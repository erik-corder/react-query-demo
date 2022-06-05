import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUserById = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchUserById(email));

  const channelId = user?.data.channelId;

  useQuery(["channel", channelId], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });

  return <div>Dependent Queries</div>;
};
