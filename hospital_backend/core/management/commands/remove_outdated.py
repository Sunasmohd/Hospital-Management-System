from django.core.management.base import BaseCommand
from hospital_manage.models import Timings

class Command(BaseCommand):
  help = 'Remove outdated Timings records'

  def handle(self, *args, **options):
      timings = Timings.objects.remove_outdated_records()
      if timings == None:
        self.stdout.write(self.style.WARNING('There is no records to remove'))
      else:
        self.stdout.write(self.style.SUCCESS('Successfully removed outdated Timings records'))
