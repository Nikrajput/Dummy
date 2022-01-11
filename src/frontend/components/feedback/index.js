import React from 'react'

import { FeedbackButton } from './button'
import { FeedbackBody } from './body'

export const FeedBack = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <FeedbackButton setOpen={setOpen} />
      <FeedbackBody open={open} handleClose={() => setOpen(false)} />
    </>
  )
}
