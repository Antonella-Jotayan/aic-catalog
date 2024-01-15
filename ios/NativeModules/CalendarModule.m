//
//  CalendarModule.m
//  ArtInstituteOfChicagoCatalog
//
//  Created by Antonella Jotayan on 15/01/2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)

RCT_EXTERN_METHOD(createCalendarEvent:(NSString *)title
                  location:(NSString *)location
                  startDate:(NSString *)startDate
                  endDate:(NSString *)endDate
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)

@end

