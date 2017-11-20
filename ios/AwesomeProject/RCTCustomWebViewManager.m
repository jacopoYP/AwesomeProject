//
//  RCTWebViewManager.m
//  AwesomeProject
//
//  Created by Jacopo Sanguineti on 20.11.17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RCTCustomWebViewManager.h"
#import "RCTCustomWebView.h"

@interface RCTCustomWebViewManager () <RCTWebViewDelegate>

@end

@implementation RCTCustomWebViewManager

RCT_EXPORT_MODULE()
//RCT_EXPORT_VIEW_PROPERTY(finalUrl, NSString)

- (UIView *)view
{
  RCTCustomWebView *webView = [RCTCustomWebView new];
  webView.delegate = self;
  return webView;
}

@end
