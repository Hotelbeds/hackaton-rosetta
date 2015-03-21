//
//  NetworkClient.m
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import "NetworkClient.h"
#import <AFHTTPRequestOperationManager.h>
#import <libextobjc/EXTScope.h>

@implementation NetworkClient

+ (NetworkClient *)sharedInstance
{
    static NetworkClient *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[NetworkClient alloc] init];
    });
    return sharedInstance;
}

- (void)GETRequestWithURL:(NSURL *)url
               parameters:(NSDictionary *)parameters
               completion:(void (^)(NSError *error, id result))completion {
    // add credentials to the url
    AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
    @weakify(self);
    [manager GET:[url absoluteString] parameters:nil success:^(AFHTTPRequestOperation *operation, id responseObject) {
        completion(nil, responseObject);
    } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        @strongify(self);
        if (!self) return;
        completion(error, nil);
    }];
    
}

@end
