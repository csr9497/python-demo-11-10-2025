import boto3
import os

def lambda_handler(event, context):
    ses = boto3.client('ses')
    subject = 'RDS/Aurora CPU Alarm Triggered'
    body = f'CloudWatch alarm event: {event}'
    ses.send_email(
        Source=os.environ['SES_FROM'],
        Destination={'ToAddresses': [os.environ['SES_TO']]},
        Message={
            'Subject': {'Data': subject},
            'Body': {'Text': {'Data': body}} 
        }
    )
    return {'status': 'sent'}
