import React from 'react';
import Avatar from 'boring-avatars';

interface ProfileImageProps {
  username: string;
}

// Function component without React.FC
function ProfileImage({ username }: ProfileImageProps) {
  return (
    <div>
      <Avatar name={username} variant="beam" size={100} />
    </div>
  );
}

export default ProfileImage;
