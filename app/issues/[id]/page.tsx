import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ViewMarkdown from "@/app/components/ViewMarkdown";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading> {issue.title} </Heading>
      <Flex gap={'3'} my={'2'}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt={'4'}> 
        <ViewMarkdown source={issue.description} /> 
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
