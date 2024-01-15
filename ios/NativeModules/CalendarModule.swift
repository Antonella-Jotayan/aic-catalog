import React

import UIKit
import EventKitUI

@objc(CalendarModule)
class CalendarModule: NSObject, EKEventEditViewDelegate {
  
  var bridge: RCTBridge!
  var successCallback: RCTResponseSenderBlock?

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc(createCalendarEvent:location:startDate:endDate:errorCallback:successCallback:)
  func createCalendarEvent(title: String, location: String, startDate: String, endDate: String, errorCallback: @escaping RCTResponseSenderBlock, successCallback: @escaping RCTResponseSenderBlock) {
    self.successCallback = successCallback

    let store = EKEventStore()
     
    let event = EKEvent(eventStore: store)
    event.title = title
    event.location = location
    
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
    guard let start = formatter.date(from: startDate), let end = formatter.date(from: endDate) else {
      errorCallback(["Invalid date format."])
      return
    }
    
    event.startDate = start
    event.endDate = end
    
    event.calendar = store.defaultCalendarForNewEvents
    
    DispatchQueue.main.async {
      let editViewController = EKEventEditViewController()
      editViewController.event = event
      editViewController.eventStore = store
      editViewController.editViewDelegate = self
      
      if let rootViewController = UIApplication.shared.windows.first(where: { $0.isKeyWindow })?.rootViewController {
          rootViewController.present(editViewController, animated: true, completion: nil)
      }
    }

  }
  
  func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
    if action == .saved, let event = controller.event, let eventIdentifier = event.eventIdentifier {
        self.successCallback?([eventIdentifier])
    }
    controller.dismiss(animated: true, completion: nil)
  }
}