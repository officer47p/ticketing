import { Publisher, Subjects, TicketCreatedEvent } from "@jdnfadjks/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
