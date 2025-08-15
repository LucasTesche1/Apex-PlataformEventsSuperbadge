trigger BatchErrorEventTrigger on BatchApexErrorEvent (after insert) {
	BatchErrorEventHelper.handleBatchErrorEvents(Trigger.New);
}
