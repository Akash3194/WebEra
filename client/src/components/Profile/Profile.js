import React, { Fragment, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Input,
  InputLabel,
} from "@material-ui/core";
import useStyles from "../BasicStyles/BasicStyles";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import theme from "./../Themes/themeForButtonFieldRadius";
import { ThemeProvider } from "@material-ui/core/styles";
import Axios from "axios";
import { updateProfileUrl } from "../Urls/url";
// import Drawer from "../Drawer/Drawer";
import spinner from "./../../images/lg.rotating-balls-spinner.gif";
import SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

const Profile = props => {
  const classes = useStyles();

  const profileState = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    editingMode: false,
    loading: false,
    profileImage: null,
  };

  const [profileData, setProfileData] = React.useState(profileState);

  // To fetch data when component mounts
  useEffect(() => {
    console.log("test");
    if (ls.get("user")) {
      const user = ls.get("user");
      setProfileData({
        ...profileData,
        firstName: user.firstName,
        lastName: user.lastName,
        companyName: user.companyName ? user.companyName : "",
        phone: user.phone ? user.phone : "",
        email: user.email,
        profileImage: user.dpdet.name,
        loading: false,
      });
    } else {
      setProfileData({
        ...profileData,
        loading: true,
      });
      Axios.get(`/user/${props.match.params.userId}/userProfile`)
        .then(user => {
          setProfileData({
            ...profileData,
            firstName: user.data.user.firstName,
            lastName: user.data.user.lastName,
            companyName: user.data.user.companyName
              ? user.data.user.companyName
              : "",
            phone: user.data.user.phone ? user.data.user.phone : "",
            email: user.data.user.email,
            profileImage: user.data.user.dpdet.name,
            loading: false,
          });
        })
        .catch(err => {
          setProfileData({
            ...profileData,
            loading: false,
          });
        });
    }
  }, [props.match.params.userId]);

  const changeMode = () => {
    setProfileData({
      ...profileData,
      editingMode: true,
    });
  };

  const handleImage = event => {
    setProfileData({
      ...profileData,
      profileImage: event.target.files[0],
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setProfileData({
      ...profileData,
      loading: true,
    });

    const formData = new FormData();
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("compName", profileData.companyName);
    formData.append("email", profileData.email);
    formData.append("mobile", profileData.phone);

    Axios.put(updateProfileUrl, formData).then(() => {
      setProfileData({
        ...profileData,
        loading: false,
        editingMode: false,
      });
    });
  };

  const handleChange = event => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Fragment>
      {/* <Drawer profileData={profileData} prop={props}></Drawer> */}
      {profileData.loading ? (
        <div className={`${classes.mt4} ${classes.textCenter}`}>
          <img src={spinner} alt="" />
        </div>
      ) : (
        <Container maxWidth="md" className={`${classes.mt100} ${classes.my4}`}>
          <Box borderLeft={1} borderColor="primary.main" pt="1.5rem">
            <Box ml="5rem">
              <Typography variant="h6"> Personal Information</Typography>
              <ThemeProvider theme={theme}>
                <Box display="flex" mt="1.5rem">
                  <TextField
                    label="FirstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: profileData.editingMode ? false : true,
                    }}
                    fullWidth
                  />
                  <TextField
                    label="LastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className={`${classes.ml4}`}
                    InputProps={{
                      readOnly: profileData.editingMode ? false : true,
                    }}
                    fullWidth
                  />
                </Box>
                <TextField
                  label="Company name"
                  name="companyName"
                  onChange={handleChange}
                  value={profileData.companyName}
                  InputProps={{
                    readOnly: profileData.editingMode ? false : true,
                  }}
                  className={`${classes.mt4}`}
                  fullWidth
                />
                {/* <TextField
                label="Email address"
                name="email"
                defaultValue="Hello World"
                InputProps={{
                  readOnly: true,
                }}
                className={`${classes.mt4}`}
                fullWidth
              /> */}
                <TextField
                  label="Phone number"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  InputProps={{
                    readOnly: profileData.editingMode ? false : true,
                  }}
                  className={`${classes.mt4}`}
                  fullWidth
                />
                {/* <TextField
                type="file"
                accept="image/*"
                className={`${classes.mt4}`}
                id="outlined-basic"
                variant="outlined"
                name="myImage"
                onChange={handleImage}
                min="0.4"
                fullWidth
                required
              /> */}
                <InputLabel htmlFor="profileImage" className={`${classes.mt4}`}>
                  Choose profile picture
                </InputLabel>
                <Input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  fullWidth
                  margin="none"
                  placeholder="Select your profile picture"
                  onChange={handleImage}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  className={`${classes.my4}`}
                  onClick={profileData.editingMode ? handleSubmit : changeMode}
                >
                  {profileData.editingMode ? (
                    <Fragment>
                      <PersonIcon></PersonIcon>&nbsp;Update Profile
                    </Fragment>
                  ) : (
                    <Fragment>
                      <EditIcon></EditIcon>&nbsp;Edit Profile
                    </Fragment>
                  )}
                </Button>
              </ThemeProvider>
            </Box>
          </Box>
        </Container>
      )}
    </Fragment>
  );
};

export default Profile;
