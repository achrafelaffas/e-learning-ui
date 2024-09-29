import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

interface CardVideoProps {
  nameVideo: string | undefined;
}

const CardVideo = ({ nameVideo }: CardVideoProps) => {
  const [videoURL, setVideoURL] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fileRestApi } = useApi();

  useEffect(() => {
    // If nameVideo is undefined, don't fetch and set a default placeholder
    if (!nameVideo) {
      setVideoURL(undefined);  // Option to show a default empty state
      setLoading(false); // Stop loading since there's no video to fetch
      return;
    }

    const fetchVideo = async () => {
      try {
        setLoading(true);
        // console.log("Fetching video from API...");

        // Fetch the video as a blob
        const response = await fileRestApi.getVideo(nameVideo, {
          responseType: 'blob', // Ensure the response is a blob
        });

        // console.log("API response:", response);

        // Convert the blob to a URL for the video source
        const videoBlob = response.data;
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoURL(videoUrl); // Set the video URL to the state

        // console.log("Video URL created:", videoUrl);
      } catch (error) {
        console.error("Error fetching video:", error);
        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    // Clean up the object URL when the component unmounts
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL); // Clean up the object URL
      }
    };
  }, [fileRestApi, nameVideo]); // nameVideo is now a dependency

  return (
    <>
      {loading ? (
        <p>Loading video...</p>
      ) : error ? (
        <p>{error}</p>
      ) : videoURL ? (
        <video width="100%" controls>
          <source src={videoURL} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
      ) : (
        <div>No video available for this chapter.</div>
      )}
    </>
  );
};

export default CardVideo;
