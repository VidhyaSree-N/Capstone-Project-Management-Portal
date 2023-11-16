import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PublishProjectForm from "components/forms/PublishProjectForm";
import ProjectPreview from "../project/ProjectPreview";
import Navbar from "components/Header/navbar";
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Delete from '@mui/icons-material/Delete';


import DialogActions from '@mui/material/DialogActions';


import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  CardActions,
  TablePagination, 
  CssBaseline,
  Paper, 
  Toolbar, 
  Typography,
  CardContent, 
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { Card } from '@mui/material';
import { Container } from '@mui/material';



// take these for search button
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: "1.5px solid #9F9F9F",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  marginRight:"3rem",
  marginLeft: 0,
  boxShadow: 'none',
  [theme.breakpoints.up('sm')]: {
    width: '40ch',
    marginLeft: theme.spacing(1),
    '&:focus': {
      width: '30ch', // Increase the focused width here
    },
  },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: "none",
}));
 

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: "100%",
    height: '100%',
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: '40ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
/// till here



const StyledPaper = styled(Paper)(({ theme }) => ({
  marginLeft: theme.spacing(7),
  background: "whitesmoke" ,
  borderRadius: "10px",
  marginRight : theme.spacing(7),
  marginTop: theme.spacing(7),
  marginBottom: theme.spacing(7),
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#0097EB" ,
  fontSize: "16px",
  fontFamily : "Poppins",
  color: theme.palette.common.white,
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis"
}));

const HoverTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    cursor: 'pointer',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: "14.5px",
  fontFamily: "Poppins",
  whiteSpace: "normal",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "1px"
}));

const getDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we need to add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};



export default function ClientDashBoard() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [preview ,setPreview] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchName, setSearchName] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [experienceText, setExperienceText] = useState('');
  const [skillsText, setSkillsText] = useState('');
  
  const handleClick = (id) => {
    setPopup(true);
    setSelectedProject(id);
}

  const handleOpenForm = () => {
    setFormOpen(true);
  }

  const handleCloseForm = () => {
    setFormOpen(false);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the `experienceText` and `skillsText` to your server or storage service for storage.
    // Example: You can use fetch or Axios to send a POST request to your backend.
    // Remember to replace this with your actual data storage logic.
    console.log('Experience Text:', experienceText);
    console.log('Skills/Technologies:', skillsText);
    // You can clear the form and close it after submission.
    setExperienceText('');
    setSkillsText('');
    handleCloseForm();
  }


  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTableData();
    }, []);

  useEffect(() => {
      if (searchName) {
        const filtered = projects.filter((project) => project.name.toLowerCase().includes(searchName.toLowerCase()));
        setFilteredProjects(filtered);
      } else {
        setFilteredProjects(projects);
      }
  }, [projects, searchName]);


  const handleClose = () => {
    setPreview(false);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
    if (searchName) {
      const filtered = projects.filter((project) => project.name.toLowerCase().includes(searchName.toLowerCase()));
      setFilteredProjects(filtered);
    } else {
      setFilteredProjects(projects);
    }
  }  


  return (
    <>
            <Navbar position="relative">
            </Navbar>
      <main>
      {preview && <ProjectPreview projectId={selectedProject}  handleClose={handleClose} />}
      

          
      <Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={6}> {/* Half the width on sm and md screens */}
    <Card style={{ backgroundColor: 'white', border: '1px solid black' }}>
      <CardContent style={{ padding: 0 }}>
        {formOpen ? (
          <form>
            {/* Add your form fields here */}
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        ) : (
          <div>
            <Button 
              variant="contained"
              color="primary"
              onClick={handleOpenForm}
              startIcon={<AddIcon />}
              style={{
                width: '100%', 
                backgroundColor: '#4caf50', 
                color: 'white', 
                textTransform: 'none', 
                borderRadius: 0, 
              }}
            > 
              <Typography variant='h6'>
                Add experience
              </Typography>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
    {/* The Dialog component for formOpen would be here */}
    <Dialog open={formOpen} onClose={handleCloseForm} fullScreen>
        <DialogContent>
          <TextField
            label="Tag your experience to help companies/students find it in the marketplace"
            variant="outlined"
            fullWidth
            value={experienceText}
            onChange={(e) => setExperienceText(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Skills/Technologies"
            variant="outlined"
            fullWidth
            value={skillsText}
            onChange={(e) => setSkillsText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleCloseForm}>
            Close
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
  </Grid>
  <Grid item xs={12} sm={6} md={6}> {/* Also half the width on sm and md screens */}
    <Card style={{ width: '100%', backgroundColor: 'white', border: '1px solid black' }}>
      <CardContent style={{ padding: 0 }}>
        <Search style={{ width: '100%', margin: '0 auto', display: 'flex' }}> {/* Search component takes the full width */}
          <SearchIconWrapper style={{ paddingLeft: '16px' }}>
            <SearchOutlinedIcon />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ width: 'calc(100% - 32px)', paddingLeft: '16px' }} // Input takes remaining width minus padding and icon
            placeholder="Search by Project Name"
            inputProps={{ 'aria-label': 'search' }}
            value={searchName}
            onChange={handleSearchNameChange}
          />
        </Search>
      </CardContent>
    </Card>
  </Grid>
  {/* The third <Grid item> has been removed, and the rest of the code remains unchanged */}
  <React.Fragment>
      <Grid container spacing={2} justifyContent="center">
        {/* Other Grid items */}
        <Grid item xs={12} sm={4} md={4}>
        <Card style={{ backgroundColor: 'white', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)' }}>
            <CardContent style={{ padding: 16 }}>
              <Button 
                variant="contained"
                color="primary"
                onClick={handleInviteStudents}
                startIcon={<AddIcon />}
                style={{
                  width: '100%', 
                  backgroundColor: '#4caf50',
                  color: 'white', 
                  textTransform: 'none', 
                  borderRadius: 0, 
                }}
              >
                Invite Learners
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Invite Students Dialog */}
      <Dialog open={inviteDialogOpen} onClose={handleCloseInviteDialog}>
        <DialogTitle>Invite Learners</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email addresses of the students you wish to invite.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Addresses"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInviteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={sendInvites} color="primary" variant="contained">
            Send Invites
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
</Grid>
<Typography
  variant="h5"
  component="div"
  sx={{ flexGrow: 1, color: "#0097EB", fontFamily: "Poppins", mt: 4, mb: 2 }}
>
  My experiences
</Typography>

{/* Align items to the start (left) */}
<Grid container spacing={2} alignItems="flex-start">
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ maxWidth: 345, mb: 4 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Technical Skills
        </Typography>
        <Typography variant="body2" color="textSecondary">
          MongoDB
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Express
        </Typography>
        <Typography variant="body2" color="textSecondary">
          React
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Node.js
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>

    <StyledPaper>
        <Toolbar sx={{height:"100px"}}>
         
         <Typography
           variant="h5"
           noWrap
           component="div"
           sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } , color: "#0097EB", fontFamily:"Poppins" }}
         >
           Your Projects
         </Typography>
         <PublishProjectForm data={projects} setData={setProjects} />
         <Box sx={{ml:1.5}} ></Box>
        </Toolbar>

        <Grid container spacing={2}> 
               {filteredProjects
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((project, index) => (

                
        <Grid item xs={12} sm={4} md={4} lg={3} key={project._id}> {/* Adjust the grid breakpoints as required */}
          <Card sx={{ maxWidth: 345 }}> {/* You can adjust width as necessary */}
            <CardContent onClick={() => { setSelectedProject(project._id); setPreview(true); }}>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
              <Typography variant="body2">
                Skills: {project.skills}
              </Typography>
              <Typography variant="body2">
                Created On: {getDate(project.createdAt)}
              </Typography>
              <Typography variant="body2">
                Created By: {project.createdBy}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
          <FavoriteIcon />
           </IconButton>
           <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              onClick={() => handleExpandClick(project._id)}
              aria-expanded={expanded[project._id] || false}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded[project._id] || false} timeout="auto" unmountOnExit>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress variant="determinate" value={project.progress || 0} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress variant="determinate" value={70} />
            </Box>
            <Typography variant="caption" display="block" gutterBottom>
                Assigned To: {project.assignedTo || 'v.parushaboyena001@umb.edu'}
              </Typography>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton color="error" onClick={() => handleClick(project._id)} aria-label="delete">
                  <Delete />
                </IconButton>
              </CardActions>
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
         ))
        }
       </Grid>
        
        <TablePagination
          sx = {{marginRight:"1.5rem"}}
          component="div"
          count={filteredProjects.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
      </main>      

    </>
  );
}
