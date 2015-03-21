//
//  NetworkClient.h
//  SuegrApp
//
//  Created by Diego Lafuente Garcia on 21/03/15.
//  Copyright (c) 2015 Diego Lafuente Garcia. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NetworkClient : NSObject

+ (NetworkClient *)sharedInstance;

- (void)GETRequestWithURL:(NSURL *)url
               parameters:(NSDictionary *)parameters
               completion:(void (^)(NSError *error, id result))completion;

@end
