import './Profile.css';
import React, {createContext, useContext, useEffect, useState} from "react";
import ProfileEditBox from "./ProfileEditBox";
import {
  deleteProfile,
  loadProfileNames, loadSettings,
  saveSettings,
  selectedProfile,
  setSelectedProfile
} from "../../utils/LocalStorage";
import {defaultSettings} from "../../utils/SavedSettings";
import {ProfileContext} from "./ProfileContext";


const Profile = () => {
  const {setGlobalProfile} = useContext(ProfileContext);
  const [profiles, setProfiles] = useState(loadProfileNames());
  const [profile, setProfile] = useState(selectedProfile());
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

  useEffect(() => {
    if (profiles.includes(editName) && (showEdit || showNew)) {
      setWarning("Profile with that name already exists");
    } else if (editName === "" && (showEdit || showNew)) {
      setWarning("Enter profile name");
    } else if (profiles.length === 1 && showDelete) {
      setWarning("Cannot delete last profile");
    } else {
      setWarning(undefined);
    }
  }, [editName, showEdit, showNew, showDelete, profiles]);

  useEffect(() => {
    setSelectedProfile(profile);
    setGlobalProfile(profile);
  }, [setGlobalProfile, profile]);

  const confirmAdd = () => {
    console.log(`Adding new profile: ${editName}`)
    setProfiles(profiles.concat(editName));
    setProfile(editName);
    const newProfile = {...defaultSettings};
    newProfile.name = editName;
    saveSettings(newProfile);
    setShowNew(false);
  }

  const confirmEdit = () => {
    console.log(`Renaming profile: ${profile} -> ${editName}`)
    const oldProfile = profile;
    const profileSettings = loadSettings(oldProfile);
    saveSettings({...profileSettings, name: editName});
    setProfiles(profiles.filter((e) => e !== profile).concat(editName));
    setProfile(editName);
    deleteProfile(oldProfile);
    setShowEdit(false);
  }

  const confirmDelete = () => {
    const newProfiles = profiles.filter((e) => e !== profile);
    setProfiles(newProfiles);
    setProfile(newProfiles[0]);
    deleteProfile(profile);
    setShowDelete(false);
  }

  return (
    <div className="profile-container">
      <div>Profile:</div>
      <select name="league" className="select-league" value={profile}
              onChange={(e) => setProfile(e.target.value)}>
        {profiles.map((profile) => {
          return <option className="option-league" key={profile} value={profile}>{profile}</option>;
        })};
      </select>
      <div className="profile-icon profile-icon-large" onClick={() => {
        setShowEdit(false);
        setShowDelete(false);
        setEditName("");
        setShowNew(true);
      }}>+
      </div>
      <div className="profile-icon" onClick={() => {
        setShowDelete(false);
        setShowNew(false);
        setEditName(profile);
        setShowEdit(true);
      }}>✎
      </div>
      <div className="profile-icon" onClick={() => {
        setShowNew(false);
        setShowEdit(false);
        setShowDelete(true);
      }}>✕
      </div>

      {showNew &&
          <ProfileEditBox
              header={"Create new profile"}
              editValue={editName}
              setEditValue={setEditName}
              show={setShowNew}
              confirm={confirmAdd}
              warning={warning}
          />
      }
      {showEdit &&
          <ProfileEditBox
              header={"Edit profile name"}
              editValue={editName}
              setEditValue={setEditName}
              show={setShowEdit}
              confirm={confirmEdit}
              warning={warning}
          />
      }
      {showDelete &&
          <ProfileEditBox
              header={`Delete profile`}
              editValue={""}
              show={setShowDelete}
              confirm={confirmDelete}
              warning={warning}
              saveText={"Confirm"}
          />
      }
    </div>
  )
}

export default Profile;
