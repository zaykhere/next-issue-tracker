'use client';

import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview';

interface Props {
  source: any
}

const ViewMarkdown = (props: Props) => {
  return (
    <MarkdownPreview source={props.source} /> 
  )
}

export default ViewMarkdown