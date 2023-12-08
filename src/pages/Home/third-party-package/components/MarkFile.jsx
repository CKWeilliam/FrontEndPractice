const MarkData = [
  {
      'part_no': 'XJ112233',
      'part_type': 'HD Backplane',
      'file_category': 'EEPROM',
      'uploaded_dt': { '$date': '2023-12-03T08:30:45.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e938a' },
              'file_name': 'Example1.txt',
              'file_version': '2',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e938b' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e938c' },
              'file_name': 'Example2.txt',
              'file_version': '3',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e938d' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'AB987654',
      'part_type': 'Memory',
      'file_category': 'BOM',
      'uploaded_dt': { '$date': '2023-12-03T12:15:22.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e938e' },
              'file_name': 'Example3.txt',
              'file_version': '1',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e938f' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e9390' },
              'file_name': 'Example4.txt',
              'file_version': '2',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e9391' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'ZYX987654',
      'part_type': 'Riser Card',
      'file_category': 'Other',
      'uploaded_dt': { '$date': '2023-12-03T16:45:10.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e9392' },
              'file_name': 'Example5.txt',
              'file_version': '1',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e9393' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e9394' },
              'file_name': 'Example6.txt',
              'file_version': '3',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e9395' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'JK112233',
      'part_type': 'Add-on Card',
      'file_category': 'BOM',
      'uploaded_dt': { '$date': '2023-12-03T20:00:05.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e9396' },
              'file_name': 'Example7.txt',
              'file_version': '2',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e9397' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e9398' },
              'file_name': 'Example8.txt',
              'file_version': '1',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e9399' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'LMN123456',
      'part_type': 'Software',
      'file_category': 'Other',
      'uploaded_dt': { '$date': '2023-12-03T23:30:30.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e939a' },
              'file_name': 'Example9.txt',
              'file_version': '3',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e939b' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e939c' },
              'file_name': 'Example10.txt',
              'file_version': '2',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e939d' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'OP112233',
      'part_type': 'Blade Server Module',
      'file_category': 'SBOM',
      'uploaded_dt': { '$date': '2023-12-04T08:45:18.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e939e' },
              'file_name': 'Example11.txt',
              'file_version': '1',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e939f' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93a0' },
              'file_name': 'Example12.txt',
              'file_version': '2',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e93a1' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'QR112233',
      'part_type': 'SuperServers',
      'file_category': 'BIOS',
      'uploaded_dt': { '$date': '2023-12-04T12:30:12.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93a2' },
              'file_name': 'Example13.txt',
              'file_version': '3',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e93a3' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93a4' },
              'file_name': 'Example14.txt',
              'file_version': '1',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e93a5' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'ST112233',
      'part_type': 'SSD-Solid State',
      'file_category': 'Regular',
      'uploaded_dt': { '$date': '2023-12-04T16:15:28.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93a6' },
              'file_name': 'Example15.txt',
              'file_version': '2',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e93a7' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93a8' },
              'file_name': 'Example16.txt',
              'file_version': '3',
              'file_type': 'text/plain',
              '_id': { '$oid': '5a4d86e81d99a843a74e93a9' }
          }
      ],
      '__v': 1
  },
  {
      'part_no': 'UV112233',
      'part_type': 'Cooling Fan',
      'file_category': 'EEPROM',
      'uploaded_dt': { '$date': '2023-12-04T20:00:45.000Z' },
      'files': [
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93aa' },
              'file_name': 'Example17.txt',
              'file_version': '1',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e93ab' }
          },
          {
              'file_id': { '$oid': '5a4d86e81d99a843a74e93ac' },
              'file_name': 'Example18.txt',
              'file_version': '2',
              'file_type': 'application/octet-stream',
              '_id': { '$oid': '5a4d86e81d99a843a74e93ad' }
          }
      ],
      '__v': 1
  }
]

export default MarkData