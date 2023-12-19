import './Profile.css';
import React, {useEffect, useState} from "react";

const Profile = () => {
  const [profiles, setProfiles] = useState(["default", "Elementalist", "Gladiator"]);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editName, setEditName] = useState("");
  const [warning, setWarning] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleEsc = (event: any) => {
      if (event.key === 'Escape') {
        setShowNew(false);
        setShowDelete(false);
        setShowEdit(false);
      }
      if (event.key === 'Enter') {
        if (showNew) confirmAdd();
        if (showEdit) confirmEdit();
        if (showDelete) confirmDelete();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [editName, showNew, showEdit, showDelete]);

  const showNewProfileBox = () => {
    setShowEdit(false);
    setShowDelete(false);

    setEditName("");
    setShowNew(true);
  }

  const showEditProfileBox = () => {
    setShowDelete(false);
    setShowNew(false);

    setEditName(selectedProfile);
    setShowEdit(true);
  }

  const showDeleteProfileBox = () => {
    setShowNew(false);
    setShowEdit(false);
    setShowDelete(true);
  }

  const confirmAdd = () => {
    setProfiles(profiles.concat(editName));
    setSelectedProfile(editName);
    setShowNew(false);
  }

  const confirmEdit = () => {
    setProfiles(profiles.filter((e) => e !== selectedProfile).concat(editName));
    setSelectedProfile(editName);
    setShowEdit(false);
  }

  const confirmDelete = () => {
    setProfiles(profiles.filter((e) => e !== selectedProfile));
    setSelectedProfile(profiles[0]);
    setShowDelete(false);
  }

  return (
    <div className="profile-container">
      <div>Profile:</div>
      <select name="league" className="select-league" value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}>
        {profiles.map((profile) => {
          return <option className="option-league" value={profile}>{profile}</option>;
        })};
      </select>
      <div className="profile-icon profile-icon-large" onClick={() => showNewProfileBox()}>+</div>
      <div className="profile-icon" onClick={() => showEditProfileBox()}>✎</div>
      <div className="profile-icon" onClick={() => showDeleteProfileBox()}>✕</div>

      {showNew &&
          <div className="new-profile-box">
              <div className="profile-header">Create new profile</div>
              <div className="profile-input-area">
                  Profile name: <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}/>
              </div>
              <div className="profile-button-area">
                  <button className="reset-button" onClick={() => {
                    setShowNew(false);
                  }}> Cancel
                  </button>
                  <button className="copy-button" onClick={() => {
                    confirmAdd()
                  }}> Save
                  </button>
              </div>
          </div>
      }

      {showEdit &&
          <div className="new-profile-box">
              <div className="profile-header">Edit profile name</div>
              <div className="profile-input-area">
                  Profile name: <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)}/>
              </div>
              <div className="profile-button-area">
                  <button className="reset-button" onClick={() => {
                    setShowEdit(false);
                  }}> Cancel
                  </button>
                  <button className="copy-button" onClick={() => {
                    confirmEdit();
                  }}> Save
                  </button>
              </div>
          </div>
      }
      {showDelete &&
          <div className="new-profile-box">
              <div className="profile-header">Delete profile: {selectedProfile}</div>
              <div className="profile-button-area">
                  <button className="reset-button" onClick={() => {
                    setShowDelete(false);
                  }}> Cancel
                  </button>
                  <button className="copy-button" onClick={() => {
                    confirmDelete();
                  }}> Confirm
                  </button>
              </div>
          </div>
      }
    </div>
  )
}

export default Profile;
