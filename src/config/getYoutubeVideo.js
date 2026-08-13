const API_KEY = "AIzaSyCy-Whi0hZosf62_oP9zFg2xcUYrt199n8";
// const CHANNEL_ID = "UC0zFqvJm7xJk7ZyY9zJp6Hg";
const CHANNEL_ID = "UCvqDQv0q8UvwDX14YwS2qng";


export const fetchVideos = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`,
      );
      const data = await res.json();
    
      return data
      
      
    };