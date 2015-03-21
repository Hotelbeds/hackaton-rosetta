//
//  ConfirmationViewController.h
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ConfirmationViewController : UIViewController

@property (strong, nonatomic) NSString *hotelName;
@property (strong, nonatomic) NSString *hotelPrice;
@property (strong, nonatomic) NSString *hotelDistance;
@property (strong, nonatomic) NSDate *fromDate;
@property (strong, nonatomic) NSDate *toDate;


@end
