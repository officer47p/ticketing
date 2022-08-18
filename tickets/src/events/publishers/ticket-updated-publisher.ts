import { Publisher, Subjects, TicketUpdatedEvent } from "@jdnfadjks/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
