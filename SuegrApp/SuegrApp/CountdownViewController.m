//
//  CountdownViewController.m
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 20/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import "CountdownViewController.h"

@interface CountdownViewController ()

@property (weak, nonatomic) IBOutlet UIDatePicker *datePicker;

@end

@implementation CountdownViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    // Create a new date with the current time
    NSDate *date = [NSDate new];
    // Split up the date components
    NSDateComponents *time = [[NSCalendar currentCalendar]
                              components:NSCalendarUnitHour | NSCalendarUnitMinute
                              fromDate:date];
    NSInteger seconds = ([time hour] * 60 * 60) + ([time minute] * 60);
    _datePicker.countDownDuration = seconds;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
