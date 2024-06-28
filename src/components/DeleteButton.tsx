import React from "react";

type Props = {
  handleDeleteMarkers: () => void;
};

const DeleteButton: React.FC<Props> = ({ handleDeleteMarkers }) => {
  return (
    <button className="delete-button" onClick={handleDeleteMarkers}>
      X
    </button>
  );
};

export default DeleteButton;
