import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { sequenceProtoToMidi } from '@magenta/music';
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { saveAs } from 'file-saver';
import Lottie from 'react-lottie'
import notesLoader from '../lotties/52679-music-loader.json'
export default class VerticalLinearStepper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing:false,
            model: props.model,
            activeStep: 0,
            };
    }


    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 })
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 })
    };

    handleReset = () => {
        this.setState({ activeStep: 0 })
    };
    processFile = async (e) => {
        // const formData = new FormData();
        // formData.append('file', e.target.files[0]);
        // axios.post('/process', formData).then(res => {
        //     //Now do what you want with the response;
        //   })
        // requestAnimationFrame(() => requestAnimationFrame(() => {
        this.setState({processing:true})
        setTimeout(() => {
            requestAnimationFrame(() => requestAnimationFrame(() => {
                this.state.model.transcribeFromAudioFile(e.target.files[0]).then((ns) => {
                    // window.saveAs(new File([sequenceProtoToMidi(ns)], 'transcription.mid'));
                    this.setState({ convertedFile: new File([sequenceProtoToMidi(ns)], 'transcription.mid') });
                    this.setState({processing:false})
                    this.handleNext();
                    // window.location=link;
                    //   }));

                })
            }))
        }, 250)



    }
    download = (e) => {
        saveAs(this.state.convertedFile);
    }
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: notesLoader,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        return (
            <Box >
                <Stepper activeStep={this.state.activeStep} orientation="vertical">
                    <Step>
                        <StepLabel co>
                            <Typography color="white"></Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography fontWeight={'bold'} color="white">{this.state.processing?'Processing the file. Please Wait...':'Upload a file to get started.'}</Typography>
                                                       {/* <Button
                                    variant="contained"
                                    onClick={this.handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button> */}

                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <section className="container">
                                    
                                        <Button className='uploadButton' variant="contained" component="label" color="primary" onChange={this.processFile} disabled={this.state.processing}>
                                            {" "}
                                           {this.state.processing? 'uploading:)': 'Upload'}
                                            <input type="file" hidden />
                                        </Button>
                                        
                                        <Typography className='note-text' fontStyle={'italic'} color="white">{this.state.processing?'Please wait :)':''}</Typography>
                                        
                                    </section>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>
                            <Typography color="white"></Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography color="white">MIDI is ready:).</Typography>

                            <section className="container">
                                <Button variant="contained" component="label" color="primary" onClick={this.download}>
                                    Download
                                </Button>
                                {/* <Paper square elevation={0} sx={{ p: 3 }}> */}
                                    <Typography color="white">convert again??</Typography>
                                    <Button onClick={this.handleReset} sx={{ mt: 1, mr: 1 }}>
                                        Start
                                    </Button>
                                {/* </Paper> */}
                            </section>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    {/* <Button
                                    variant="contained"
                                    onClick={this.handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    finish
                                </Button>
                                <Button
                                    onClick={this.handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button> */}
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
            </Box>
        )
    }
}
