import React, {useState} from 'react'
import {autoPlay} from 'react-swipeable-views-utils';
import {Box, Button, MobileStepper} from "@mui/material";
import SwipeableViews from 'react-swipeable-views';
import {FileInStore} from '../../../Utils/types'
import styles from './Carousel.module.scss';

const AutoPlaySwipeAbleViews = autoPlay(SwipeableViews);

type Props = {
  postImages: FileInStore[];
}

export const Carousel = ({postImages}: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = postImages.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return postImages.length ? (

      <div className={styles.container}>
        <AutoPlaySwipeAbleViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {postImages.map((image, index) => (
            <div key={image.name}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  className={styles.image}
                  src={image.url}
                  alt={image.name}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeAbleViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              {'Next>'}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {'<Back'}
            </Button>
          }
        />
      </div>
    )
    : null
}
