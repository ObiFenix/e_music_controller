from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import RoomSerializer, CreateRoomSerializer
from .models import Room


# ==============
#   API Views
# ==============

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoomView(APIView):
    serializer_class = RoomSerializer

    def get(self, request, form=None):
        code = request.GET.get('code')

        if code is not None:
            room = Room.objects.filter(code=code)

            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)

            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code Parameter not fount in request'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_skip_song = serializer.data.get('votes_skip_song')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)

            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_skip_song = votes_skip_song
                room.save(update_fields=['code', 'guest_can_pause', 'votes_skip_song'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_skip_song=votes_skip_song)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        code = request.data.get('code')
        if code is not None:
            result = Room.objects.filter(code=code)

            if len(result) > 0:
                self.request.session['room_code'] = code
                return Response({'message': 'Room joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code!'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'Bad Request': 'Invalid post data (Unknown Key)!'}, status=status.HTTP_400_BAD_REQUEST)