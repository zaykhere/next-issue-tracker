"use client";

import Spinner from "@/app/components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: any, id: number) {
    try {
       setLoading(true);
       await axios.delete(`/api/issues/${id}`); 
       router.push("/issues");
       router.refresh();
    } catch (error) {
        setError(true);
    }
    finally {
        setLoading(false);
    }
  }

  return (
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button disabled={loading} color="red">Delete Issue {loading && <Spinner /> } </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue?
        </AlertDialog.Description>
        <Flex mt='4' gap='3' justify={'end'}>
            <AlertDialog.Cancel>
                <Button variant="soft" color="gray">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
                <Button color="red" onClick={(e) => handleDelete(e, issueId)}>Delete Issue</Button>
            </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
        <Button mt='2' variant="soft" color="gray" onClick={() => setError(false)}>OK</Button>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
