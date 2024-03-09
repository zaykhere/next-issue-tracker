import React, { Suspense } from 'react'
import IssueForm from '../_components/IssueForm'

const NewIssuePage = () => {
  return (
    <Suspense fallback="Loading...">
      <IssueForm />
    </Suspense>
    
  )
}

export default NewIssuePage
