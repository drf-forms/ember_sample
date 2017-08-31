from django.contrib.contenttypes.models import ContentType

from drf_auto_endpoint.router import router

from levit_report.models import Document


router.register(Document)
router.register(ContentType, read_only=True, list_me=False)
