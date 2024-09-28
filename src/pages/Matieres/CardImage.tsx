import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

interface CardImageProps {
  nameImage: string | undefined;
}

const CardImage = ({ nameImage }: CardImageProps) => {
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { fileRestApi } = useApi();

  useEffect(() => {
    // If nameImage is undefined, don't fetch and set a default placeholder
    if (!nameImage) {
      setImageURL(undefined);  // Option to show a default empty state
      setLoading(false); // Stop loading since there's no image to fetch
      return;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        // console.log("Fetching image from API...");

        // Fetch the image as a blob
        const response = await fileRestApi.getImage(nameImage, {
          responseType: 'blob', // Ensure the response is a blob
        });

        // console.log("API response:", response);

        // Convert the blob to a URL for the image source
        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl); // Set the image URL to the state

        // console.log("Image URL created:", imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

    // Clean up the object URL when the component unmounts
    return () => {
      if (imageURL) {
        URL.revokeObjectURL(imageURL); // Clean up the object URL
      }
    };
  }, [fileRestApi, nameImage]); // nameImage is now a dependency

  return (
    <>
      {loading ? (
        <p>Loading image...</p>
      ) : error ? (
        <p>{error}</p>
      ) : imageURL ? (
        <img className="w-full h-full object-cover rounded-sm" src={imageURL} alt="Matiere image" />
      ) : (
        <img
          className="w-full h-full object-cover rounded-sm"
          src="../src/pages/images/MatiereImageByDefault.jpg" // Set your placeholder image URL here
          alt="Empty placeholder"
        />
      )}
    </>
  );
};

export default CardImage;
