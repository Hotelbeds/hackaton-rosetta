//
//  CountdownViewController.m
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 20/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import "CountdownViewController.h"

@interface CountdownViewController ()

@property (weak, nonatomic) IBOutlet UILabel *daysLabel;
@property (weak, nonatomic) IBOutlet UILabel *hoursLabel;
@property (weak, nonatomic) IBOutlet UILabel *minutesLabel;
@property (weak, nonatomic) IBOutlet UILabel *secondsLabel;
@property (weak, nonatomic) IBOutlet UILabel *daysStaticLabel;
@property (weak, nonatomic) IBOutlet UILabel *hoursStaticLabel;
@property (weak, nonatomic) IBOutlet UILabel *minutesStaticLabel;
@property (weak, nonatomic) IBOutlet UILabel *secondsStaticLabel;

@property (strong, nonatomic) NSDate *dueDate;

@end

@implementation CountdownViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    _dueDate = [[NSUserDefaults standardUserDefaults] objectForKey:@"panicked"];
    _dueDate = _dueDate == nil ? [NSDate dateWithTimeIntervalSinceNow:4500] : _dueDate;
    [self setupView];
    [self updateCountDown];
    [NSTimer scheduledTimerWithTimeInterval:1.0 target:self selector:@selector(updateCountDown) userInfo:nil repeats:YES];
}

- (void)setupView {
    CGFloat labelWidth = 10;
    CGFloat staticLabelWidth = 160;
    CGFloat labelHeight = 80.0;
    // days
    _daysLabel.frame = CGRectMake(0.0, 0.0, labelWidth, labelHeight);
    _daysStaticLabel.frame = CGRectMake(labelWidth, 0.0, staticLabelWidth, labelHeight);
    // hours
    _hoursLabel.frame = CGRectMake(0.0, labelHeight, labelWidth, labelHeight);
    _hoursStaticLabel.frame = CGRectMake(labelWidth, labelHeight, staticLabelWidth, labelHeight);
    // minutes
    _minutesLabel.frame = CGRectMake(0.0, 2.0* labelHeight, labelWidth, labelHeight);
    _minutesStaticLabel.frame = CGRectMake(labelWidth, 2.0* labelHeight, staticLabelWidth, labelHeight);
    // seconds
    _secondsLabel.frame = CGRectMake(0.0, 3.0* labelHeight, labelWidth, labelHeight);
    _secondsStaticLabel.frame = CGRectMake(labelWidth, 3.0* labelHeight, staticLabelWidth, labelHeight);
}

- (void)updateCountDown {
    NSTimeInterval timediff = [_dueDate timeIntervalSinceDate:[NSDate date]];
    NSUInteger secondsInADay = 60*60*24;
    NSUInteger secondsInAnHour = 60*60;
    NSUInteger secondsInAMinute = 60;
    NSUInteger days = floor(timediff/secondsInADay);
    NSUInteger remainder = timediff - secondsInADay * days;
    NSUInteger hours = floor(remainder/secondsInAnHour);
    remainder = remainder - secondsInAnHour * hours;
    NSUInteger minutes = floor(remainder/secondsInAMinute);
    NSUInteger seconds = remainder - secondsInAMinute * minutes;
    // update labels
    _daysLabel.text = [NSString stringWithFormat:@"%d", days];
    _hoursLabel.text = [NSString stringWithFormat:@"%d", hours];
    _minutesLabel.text = [NSString stringWithFormat:@"%d", minutes];
    _secondsLabel.text = [NSString stringWithFormat:@"%d", seconds];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
