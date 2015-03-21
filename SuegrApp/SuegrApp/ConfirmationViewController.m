//
//  ConfirmationViewController.m
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import "ConfirmationViewController.h"
#import "NSDate+Rosette.h"

@interface ConfirmationViewController ()

@property (weak, nonatomic) IBOutlet UILabel *hotelNameLabel;
@property (weak, nonatomic) IBOutlet UILabel *hotelPriceLabel;
@property (weak, nonatomic) IBOutlet UILabel *datesLabel;
@property (weak, nonatomic) IBOutlet UILabel *distancesLabel;
@property (weak, nonatomic) IBOutlet UIButton *panicButton;
@property (weak, nonatomic) IBOutlet UILabel *titleLabel;
@property (weak, nonatomic) IBOutlet UIImageView *backgoundImageView;

@property (strong, nonatomic) UIActivityIndicatorView *indicatorView;

@end

@implementation ConfirmationViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    _hotelNameLabel.text = _hotelName;
    _hotelPriceLabel.text = [NSString stringWithFormat:@"%@ €", _hotelPrice];
    _datesLabel.text = [NSString stringWithFormat:@"Desde %@ hasta %@", [_fromDate rosettaStringDateFromNSDate], [_toDate rosettaStringDateFromNSDate]];
    _distancesLabel.text = _hotelDistance;
    [self hideAll];
    //Indicator view
    _indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
    _indicatorView.center = self.view.center;
    _indicatorView.hidden = NO;
    [self.view addSubview:_indicatorView];
    [_indicatorView startAnimating];
    [NSTimer scheduledTimerWithTimeInterval:2.0 target:self selector:@selector(showAll) userInfo:nil repeats:NO];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void) hideAll {
    _titleLabel.hidden = YES;
    _hotelNameLabel.hidden = YES;
    _hotelPriceLabel.hidden = YES;
    _datesLabel.hidden = YES;
    _distancesLabel.hidden = YES;
    _panicButton.hidden = YES;
    _backgoundImageView.hidden = YES;
}

- (void) showAll {
    _titleLabel.hidden = NO;
    _hotelNameLabel.hidden = NO;
    _hotelPriceLabel.hidden = NO;
    _datesLabel.hidden = NO;
    _distancesLabel.hidden = NO;
    _panicButton.hidden = NO;
    _backgoundImageView.hidden = NO;
    [_indicatorView stopAnimating];
    _indicatorView.hidden = YES;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
