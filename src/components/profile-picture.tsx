import Image from "next/image";

import profilePicture from "@/public/profile.jpg";

function ProfilePicture() {
  return (
    <div className="flex size-52 items-center justify-center">
      <Image
        className="size-full rounded-full object-cover"
        src={profilePicture}
        alt="Profile picture of Marc Le Labourier"
      />
    </div>
  );
}

export default ProfilePicture;
