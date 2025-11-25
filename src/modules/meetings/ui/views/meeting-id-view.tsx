"use client";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import MeetingIdViewHeader from "./meeting-id-view-header";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useconfirm from "../../hooks/use-confirm";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { useState } from "react";
import { MeetingStatus } from "../../types";
import UpcomingState from "../components/upcoming-state";
import ActiveState from "../components/active-state";
import CancelledState from "../components/cancelled-state";
import ProcessingState from "../components/processing-state";

export default function MeetingIdView({ meetingId }: { meetingId: string }) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  const [RemoveConfirmation, confirmRemove] = useconfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] =
    useState<boolean>(false);

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (ok) {
      await removeMeeting.mutateAsync({ id: meetingId });
    }
  };

  const isActive = data.status === MeetingStatus.Active;
  const isUpcoming = data.status === MeetingStatus.Upcoming;
  const isCancelled = data.status === MeetingStatus.Cancelled;
  const isCompleted = data.status === MeetingStatus.Completed;
  const isProcessing = data.status === MeetingStatus.Processing;

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 p-4 md:px-4 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialogOpen(true);
          }}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState/>}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
      </div>
    </>
  );
}
