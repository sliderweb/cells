// Code generated by protoc-gen-go. DO NOT EDIT.
// source: test.proto

/*
Package test is a generated protocol buffer package.

It is generated from these files:
	test.proto

It has these top-level messages:
	RunTestsRequest
	TestResult
	RunTestsResponse
*/
package test

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type RunTestsRequest struct {
	Dry  bool              `protobuf:"varint,1,opt,name=Dry" json:"Dry,omitempty"`
	Data map[string]string `protobuf:"bytes,2,rep,name=Data" json:"Data,omitempty" protobuf_key:"bytes,1,opt,name=key" protobuf_val:"bytes,2,opt,name=value"`
}

func (m *RunTestsRequest) Reset()                    { *m = RunTestsRequest{} }
func (m *RunTestsRequest) String() string            { return proto.CompactTextString(m) }
func (*RunTestsRequest) ProtoMessage()               {}
func (*RunTestsRequest) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *RunTestsRequest) GetDry() bool {
	if m != nil {
		return m.Dry
	}
	return false
}

func (m *RunTestsRequest) GetData() map[string]string {
	if m != nil {
		return m.Data
	}
	return nil
}

type TestResult struct {
	Name     string   `protobuf:"bytes,1,opt,name=Name" json:"Name,omitempty"`
	Pass     bool     `protobuf:"varint,2,opt,name=Pass" json:"Pass,omitempty"`
	Messages []string `protobuf:"bytes,3,rep,name=Messages" json:"Messages,omitempty"`
}

func (m *TestResult) Reset()                    { *m = TestResult{} }
func (m *TestResult) String() string            { return proto.CompactTextString(m) }
func (*TestResult) ProtoMessage()               {}
func (*TestResult) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *TestResult) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *TestResult) GetPass() bool {
	if m != nil {
		return m.Pass
	}
	return false
}

func (m *TestResult) GetMessages() []string {
	if m != nil {
		return m.Messages
	}
	return nil
}

type RunTestsResponse struct {
	Pass    bool          `protobuf:"varint,1,opt,name=Pass" json:"Pass,omitempty"`
	Results []*TestResult `protobuf:"bytes,2,rep,name=Results" json:"Results,omitempty"`
}

func (m *RunTestsResponse) Reset()                    { *m = RunTestsResponse{} }
func (m *RunTestsResponse) String() string            { return proto.CompactTextString(m) }
func (*RunTestsResponse) ProtoMessage()               {}
func (*RunTestsResponse) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *RunTestsResponse) GetPass() bool {
	if m != nil {
		return m.Pass
	}
	return false
}

func (m *RunTestsResponse) GetResults() []*TestResult {
	if m != nil {
		return m.Results
	}
	return nil
}

func init() {
	proto.RegisterType((*RunTestsRequest)(nil), "test.RunTestsRequest")
	proto.RegisterType((*TestResult)(nil), "test.TestResult")
	proto.RegisterType((*RunTestsResponse)(nil), "test.RunTestsResponse")
}

func init() { proto.RegisterFile("test.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 256 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x6c, 0x91, 0xc1, 0x4a, 0xc3, 0x40,
	0x10, 0x86, 0xdd, 0x6c, 0xac, 0xc9, 0x78, 0x30, 0x0c, 0x2a, 0x21, 0x17, 0x43, 0x4e, 0xc1, 0x43,
	0x0e, 0x2d, 0xa8, 0x78, 0xf2, 0x50, 0x8f, 0x4a, 0x19, 0x7c, 0x81, 0x15, 0x06, 0x0f, 0xd6, 0xa4,
	0x66, 0x76, 0x85, 0x3e, 0x86, 0x6f, 0x2c, 0xbb, 0x5b, 0x1b, 0x29, 0xde, 0xfe, 0xf9, 0x99, 0xff,
	0x9b, 0x99, 0x5d, 0x00, 0xcb, 0x62, 0xbb, 0xcd, 0x38, 0xd8, 0x01, 0x53, 0xaf, 0x9b, 0x6f, 0x05,
	0x67, 0xe4, 0xfa, 0x17, 0x16, 0x2b, 0xc4, 0x9f, 0x8e, 0xc5, 0x62, 0x01, 0x7a, 0x39, 0x6e, 0x4b,
	0x55, 0xab, 0x36, 0x23, 0x2f, 0x71, 0x01, 0xe9, 0xd2, 0x58, 0x53, 0x26, 0xb5, 0x6e, 0x4f, 0xe7,
	0x57, 0x5d, 0xc0, 0x1c, 0xc4, 0x3a, 0xdf, 0xf1, 0xd8, 0xdb, 0x71, 0x4b, 0xa1, 0xb9, 0xba, 0x85,
	0x7c, 0x6f, 0x79, 0xe6, 0x3b, 0x47, 0x66, 0x4e, 0x5e, 0xe2, 0x39, 0x1c, 0x7f, 0x99, 0xb5, 0xe3,
	0x32, 0x09, 0x5e, 0x2c, 0xee, 0x93, 0x3b, 0xd5, 0xac, 0x00, 0x3c, 0x98, 0x58, 0xdc, 0xda, 0x22,
	0x42, 0xfa, 0x6c, 0x3e, 0x78, 0x17, 0x0d, 0xda, 0x7b, 0x2b, 0x23, 0x12, 0xa2, 0x19, 0x05, 0x8d,
	0x15, 0x64, 0x4f, 0x2c, 0x62, 0xde, 0x58, 0x4a, 0x5d, 0xeb, 0x36, 0xa7, 0x7d, 0xdd, 0x10, 0x14,
	0xd3, 0xb6, 0xb2, 0x19, 0x7a, 0x99, 0x18, 0xea, 0x0f, 0xe3, 0x1a, 0x4e, 0xe2, 0x54, 0xd9, 0x9d,
	0x5a, 0xc4, 0x53, 0xa7, 0x75, 0xe8, 0xb7, 0x61, 0xfe, 0x00, 0x33, 0x6f, 0xf3, 0x88, 0x37, 0xa0,
	0xc9, 0xf5, 0x78, 0xf1, 0xef, 0xb3, 0x54, 0x97, 0x87, 0x76, 0x9c, 0xdf, 0x1c, 0xbd, 0xce, 0xc2,
	0x47, 0x2c, 0x7e, 0x02, 0x00, 0x00, 0xff, 0xff, 0x65, 0x57, 0x3e, 0x24, 0x96, 0x01, 0x00, 0x00,
}
