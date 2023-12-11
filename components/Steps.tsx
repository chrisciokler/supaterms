"use client"
import { Stepper } from '@mantine/core'

export const Steps = () => (
  <Stepper active={0} orientation="vertical" color='green'>
    <Stepper.Step label="Step 1" description="Sign Up for an account with Google or Email" />
    <Stepper.Step label="Step 2" description="Go to Docs and create a new Doc" />
    <Stepper.Step label="Step 3" description="Fill the form and automatically generate Terms and Conditions or Privacy Policy" />
    <Stepper.Step label="Step 4" description="Customize documents with AI assistance if you need more" />
    <Stepper.Step label="Step 5" description="Export your docs in HTML code or Mardown format" />
  </Stepper>
)