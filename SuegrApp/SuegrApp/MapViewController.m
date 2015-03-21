//
//  MapViewController.m
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import "MapViewController.h"
#import <MapKit/MapKit.h>
#import "NetworkClient.h"
#import "NSDate+Rosette.h"
#import "NSDictionary+UrlEncoding.h"
#import <libextobjc/EXTScope.h>

@interface MapViewController () <MKMapViewDelegate, CLLocationManagerDelegate>

@property (weak, nonatomic) IBOutlet MKMapView *mapView;
@property(nonatomic, retain) CLLocationManager *locationManager;
@property (nonatomic) BOOL drawHotels;

@end

@implementation MapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    _drawHotels = NO;
    // Location manager
    _locationManager = [[CLLocationManager alloc] init];
    _locationManager.delegate = self;
    [_locationManager requestWhenInUseAuthorization];
    [_locationManager startUpdatingLocation];
    _mapView.showsUserLocation = YES;
    _mapView.delegate = self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

- (void)mapView:(MKMapView *)aMapView didUpdateUserLocation:(MKUserLocation *)aUserLocation {
    MKCoordinateRegion region;
    MKCoordinateSpan span;
    span.latitudeDelta = 0.018;
    span.longitudeDelta = 0.018;
    CLLocationCoordinate2D location;
    location.latitude = aUserLocation.coordinate.latitude;
    location.longitude = aUserLocation.coordinate.longitude;
    region.span = span;
    region.center = location;
    [aMapView setRegion:region animated:YES];
    if (_drawHotels) {
        [self drawHotelsForLocation:location];
    }
}

- (void)drawHotelsForLocation:(CLLocationCoordinate2D)location {
    NSDateComponents *offsetComponents = [[NSDateComponents alloc] init];
    [offsetComponents setDay:2];
    NSDate *toDate = [[NSCalendar currentCalendar] dateByAddingComponents:offsetComponents toDate:_entryDate options:0];
    NSDictionary *parameters = @{
                                 @"latitude":@(location.latitude),
                                 @"longitude":@(location.longitude),
                                 @"paxes":@1,
                                 @"radius":@2.0,
                                 @"from":[_entryDate rosettaStringDateFromNSDate],
                                 @"to":[toDate rosettaStringDateFromNSDate]
                                 };
    NSString *hotelsUrlString = [NSString stringWithFormat:@"http://localhost:8080/api/hotelsavail?%@", [parameters urlEncodedString]];
    NSURL *hotelsUrl = [NSURL URLWithString:hotelsUrlString];
    @weakify(self);
    [[NetworkClient sharedInstance] GETRequestWithURL:hotelsUrl parameters:parameters completion:^(NSError *error, id result) {
        @strongify(self);
    }];
}


@end
