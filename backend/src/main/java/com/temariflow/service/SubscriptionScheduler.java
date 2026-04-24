package com.temariflow.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j @Component @RequiredArgsConstructor
public class SubscriptionScheduler {
  private final SubscriptionService subscriptionService;
  @Scheduled(cron = "0 0 2 * * *")
  public void expireSchools() { subscriptionService.suspendExpiredSchools(); log.info("Subscription expiry check completed"); }
}
