import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ViewMarkdown from '@/app/components/ViewMarkdown'
import { Issue } from '@prisma/client'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'

const IssueDetails = ({issue}: {issue: Issue}) => {
  return (
    <>
      <Heading> {issue.title} </Heading>
        <Flex gap={"3"} my={"2"}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full" mt={"4"}>
          <ViewMarkdown source={issue.description} />
        </Card>
    </>
  )
}

export default IssueDetails