//
//  Annotation.h
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import <MapKit/MapKit.h>

@interface Annotation : MKPointAnnotation

@property (strong, nonatomic) NSDictionary *hotel;

@end
